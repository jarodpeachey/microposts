import {
   http
} from './http';
import {
   ui
} from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Add a posts
ui.postSubmit.addEventListener('click', submitPost);

// Delete a post 
ui.posts.addEventListener('click', deletePost);

// Get posts
function getPosts() {
   http.get('http://localhost:8082/posts')
      .then(data => ui.showPosts(data))
      .catch(err => console.log(err));
}

function submitPost() {
   let title = ui.titleInput.value;
   let body = ui.bodyInput.value;

   // Set new post object
   const data = {
      title,
      body
   }

   // Create post in API
   http.post('http://localhost:8082/posts', data)
      .then(data => {
         getPosts();
         ui.showAlert('Post added successfully', 'alert success')
         ui.clearForm();
      })
      .catch(err => console.log(err))
}

function deletePost(e) {
   e.preventDefault();

   if (e.target.parentElement.classList.contains('delete')) {
      // Create id
      let id = e.target.parentElement.dataset.id;

      if (confirm('Are you sure you want to delete this post?')) {
         // Remove from UI
         ui.removePost(e.target.parentElement.parentElement.parentElement.parentElement);

         // Remove from data set
         http.delete(`http://localhost:8082/posts/${id}`)
            .then(data => {
               ui.showAlert('Post removed successfully', 'alert danger');
            })
      }

   }
}