import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
   http.get('http://localhost:8082/posts')
   .then(data => ui.showPosts(data))
   .catch(err => console.log(err));
}