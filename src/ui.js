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
      console.log('This is from the UI file');
      console.log(posts);
   }
}

export const ui = new UI();