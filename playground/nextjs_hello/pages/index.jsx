import { useState } from 'react';

// React components should be capitalized to distinguish them from plain HTML
function Header() {
  return (<h1>Develop. Preview. Ship. 🚀</h1>)
};
function Section1() {
  return (<h2>🔥🔥🔥🔥</h2>)
};
function TryProps({ title }) {
  console.log(title);
  return (<h1>{title ? title : "😈"}</h1>);
}
function TryList() {
  const names = ['a', 'b', 'c']
  return (<ul>
    {names.map((name) => (
      <li key={name}>{name}</li>
    ))}
  </ul>)
}

export default function HomePage() {
  const [likes, setLikes] = useState(0 /*initial value*/);
  function handleClick() {
    setLikes(likes + 1);
    console.log("bottom clicked!")
  }
  return (
    <div>
      <Header />
      <Section1 />
      <TryProps />
      <TryProps title="😲" />
      <TryProps title="🥳" />
      <TryList />
      <button onClick={handleClick}>Like Cnt({likes})</button>
    </div>
  );
}
