// Yes, im indeed out of my mind. im writing my own router


export class Router {
    constructor() {
        this.routes = []
        this.checkForNavigation()
    }
    
    mount() {
        this.handleCurrent()
        this.blockLinks()
    }

    checkForNavigation() {
        // for when user navigates with forward and backward buttons on the browser
        // forgive me, for i have violated the laws of javascript and user setInterval
        let lastLink = window.location.href
        setInterval(() => {
            if (lastLink !== window.location.href) {
                lastLink = window.location.href
                this.handleCurrent()
            }
        }, 20)
    }

    blockLinks() {
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', e => {
                if (Url.findIn(this.routes, Url.fromLink(link.href))) {
                    e.preventDefault()
                    history.pushState(null, null, link.href)
                    Url.findIn(this.routes, Url.fromLink(link.href)).mount()
                    this.blockLinks()
                } else [
                ]
            })
        })
    }

    registerRoute(route, mountFunction) {
        this.routes.push( new Url(route, mountFunction) )
    }

    handleCurrent() {
        const currentUrl = Url.fromCurrent()
        if (Url.findIn(this.routes, currentUrl)) {
            Url.findIn(this.routes, currentUrl).mount()
        } else {
        }
        this.blockLinks()
    }


}

class Url {
    constructor(urlString, mountfunction = null) {
        this.pattern = urlString
        this.mountFunction = mountfunction ? mountfunction : false

        let parts = urlString.split('/')

        if (urlString.substring(0, 4) === 'http') {
            this.routes = parts.slice(3)
        } else if (urlString.substring(0, 1) === '/') {
            this.routes = parts.slice(1)
        } else {
            this.routes = parts
        }

        if (this.routes[0] !== '') {
            this.routes.splice(0, 0, '')
        }
    }

    static fromLink(link) {
        return new Url(link)
    }

    toLink() {
        return this.routes.join('/')
    }

    static equals(urlr, urlo) {
        if (urlr.routes.length !== urlo.routes.length) {
            return false
        }
        for (let i = 0; i < urlr.routes.length; i++) {
            if (urlr.routes[i].match('<[a-zA-Z_0-9]*>')) {
                continue
            }
            if (urlr.routes[i] !== urlo.routes[i]) {
                return false
            }
        }
        return true
    }

    static fromCurrent() {
        if (window.location.href.endsWith('/')) {
            return new Url(window.location.href.substring(0, window.location.href.length - 1))
        } else {
            return new Url(window.location.href)
        }
    }

    mount() {
        this.mountFunction(this.extractFromPattern())
    }

    extractFromPattern() {
        const route = new Url(window.location.href).routes
        const pattern = this.pattern.split('/')
        let extracted = {}
        if (pattern.length == 2 && pattern[1] === '') {
            return extracted
        }
        for (let i = 0; i < route.length; i++) {
            if (pattern[i].match('<[a-zA-Z_0-9]*>')) {
                extracted[pattern[i].replace('<', '').replace('>', '')] = route[i]
            }
        }
        return extracted
    }

    static findIn(collection, url) {
        for (let registeredUrl of collection) {
            if (Url.equals(registeredUrl, url)) {
                return registeredUrl
            }
        }
    }

}

// just for syntax highlighting in template literals
// literally returns string as it is received
export function html(parts, ...interpols) {
    interpols.push('')
    let template = ''
    for (let i = 0; i < parts.length; i++) {
        template += parts[i]
        template += interpols[i]
    }
    return template
}
