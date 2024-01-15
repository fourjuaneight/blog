const randomPostBtn: HTMLButtonElement | null = document.querySelector('button#random-post');
const files: string[] = [
  {{ range (os.ReadDir "content/posts") }}
    {{ if or (ne .Name ".DS_Store") (ne .Name "_index.md") }}
      "/posts/{{ .Name }}",
    {{ end }}
  {{ end }}
];
const posts = files.map(post => post.replace(/\.md$/g, '/')).filter(post => !post.includes('index'));

randomPostBtn?.addEventListener('click', () => {
  const randomPost: string = posts[Math.floor(Math.random() * posts.length)];
  console.info(randomPost);
  window.location.href = randomPost;
});