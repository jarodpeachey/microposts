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
               <small class="subtitle mt-0 pt-0">Posted on 12/12/26</small>
               <p>${post.body}</p>

            </div>
         </div>
         `
         this.posts.innerHTML = output;
      })
   }
}

export const ui = new UI();