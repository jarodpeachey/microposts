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

// Show edit state
ui.posts.addEventListener('click', callEditState);

// Cancel edit state
document.querySelector('.card-form').addEventListener('click', cancelEditstate);

// Get posts
function getPosts() {
   http.get('http://localhost:8082/posts')
      .then(data => ui.showPosts(data))
      .catch(err => console.log(err));
}

// Submit post
function submitPost() {
   let title = ui.titleInput.value;
   let body = ui.bodyInput.value;
   let id = ui.idInput.value;
   let date = `${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}`;

   if (title === '' || body === '') {
      ui.showAlert('Please enter a title and/or body', 'danger alert');
   } else {
      // Set new post object
      const data = {
         title,
         body,
         date
      }

      if (id === '') {
         // Create post in API
         http.post('http://localhost:8082/posts', data)
            .then(data => {
               getPosts();
               ui.showAlert('Post added successfully', 'alert success')
               ui.clearForm();
            })
            .catch(err => console.log(err))
      } else {
         //Update post
         http.put(`http://localhost:8082/posts/${id}`, data)
            .then(data => {
               getPosts();
               ui.showAlert('Post updated successfully', 'alert success')
               ui.changeState('add');
               getPosts();
            })
            .catch(err => console.log(err))
      }
   }
}

// Delete post
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

// Edit state
function callEditState(e) {
   if (e.target.parentElement.classList.contains('edit')) {
      const id = e.target.parentElement.dataset.id;
      e.preventDefault();
      const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
      const body = e.target.parentElement.parentElement.nextElementSibling.nextElementSibling.textContent;

      const data = {
         id,
         title,
         body
      }

      ui.fillForm(data);
   }
}

// Cancel edit state
function cancelEditstate(e) {
   if (e.target.classList.contains('cancel-btn')) {
      ui.changeState('add');

      e.preventDefault();
   }
}