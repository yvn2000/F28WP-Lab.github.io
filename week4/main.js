var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://yvn2000.github.io/F28WP-Lab.github.io/week4/cities1.json');
ourRequest.onload = function() {
console.log(ourRequest.responseText);
};
ourRequest.send();