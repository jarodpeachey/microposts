class UI {
   constructor() {
      this.posts = document.querySelector('#posts');
      this.titleInput = document.querySelector('#title');
      this.bodyInput = document.querySelector('#body');
      this.idInput = document.querySelector('#id');
      this.postSubmit = document.querySelector('.post-submit');
      this.forState = 'add';
   }

   showPosts(posts) {
      let output = '';

      posts.forEach((post) => {
         output += `
         <div class="card">
            <div class="card-body">
               <div>
                  <h2 class="mb-0 display-inline-block">${post.title}</h2>
                  <a href="#" class="delete float-right" data-id="${post.id}"><i class="fa fa-trash-alt"></i></a>
                  <a href="#" class="edit float-right pr-2" data-id="${post.id}"><i class="fa fa-pencil-alt"></i></a>
               </div>
               <small class="subtitle mt-0 pt-0">Posted on ${post.date}</small>
               <p>${post.body}</p>

            </div>
         </div>
         `
         this.posts.innerHTML = output;
      })
   }
   showAlert(msg, classList) {
      // Create div
      const div = document.createElement('div');

      // Add classnames
      div.classList = classList;

      // Append message
      div.appendChild(document.createTextNode(msg));

      // Insert it into the DOM
      const parent = document.querySelector('.postsContainer');
      const posts = document.querySelector('#posts');

      parent.insertBefore(div, posts);

      setTimeout(() => {
         this.clearAlert();
      }, 2000)
   }
   clearAlert() {
      const currentAlert = document.querySelector('.alert');

      if (currentAlert) {
         currentAlert.remove();
      }
   }
   clearForm() {
      this.titleInput.value = '';
      this.bodyInput.value = '';
   }
   removePost(post) {
      post.remove();
   }
   fillForm(data) {
      this.titleInput.value = data.title;
      this.bodyInput.value = data.body;
      this.idInput.value = data.id;

      this.changeState('edit');
   }
   clearIdInput() {
      this.idInput.value = '';
   }
   changeState(type) {
      if(type === 'edit') {
         this.postSubmit.textContent = 'Update post';
         this.postSubmit.className = 'post-submit success';

         // Create cancel button
         const button = document.createElement('button');
         button.className = 'light m-0 cancel-btn';
         button.appendChild(document.createTextNode('Cancel'));

         // Insert button
         const cardForm = document.querySelector('.card-form');
         const formEnd = document.querySelector('.form-end');
         cardForm.insertBefore(button, formEnd);
      } else {
         this.postSubmit.textContent = 'Post Message';
         this.postSubmit.className = 'post-submit primary';
         document.querySelector('.cancel-btn').remove();

         this.clearForm();
         this.clearIdInput();
      }
   }
}

export const ui = new UI();