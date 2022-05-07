import { Router, html } from './router.js'


const content = document.querySelector('#content')
const _router = new Router()

// TODO Router.redirect()
// TOOO Router.serve()

_router.registerRoute('/', () => {
    content.innerHTML = html`
        This is homepage<br>
        <a href="/p">mm post</a>
    `
})
_router.registerRoute('/p', () => {
    content.innerHTML = html`
        This is post page without the title in the url<br>
        <a href="/">homepage</a><br>
        <a href="/p/post-title">actual post</a>
    `
})
_router.registerRoute('/p/<title>', (matches) => {
    fetch('/api/post/' + matches.title).then(res => res.json()).then(post => {
        content.innerHTML = marked.parse(post.markdown)
    })
})

export const router = _router
