"use client";

export default function Error(error, reset) {
  return (
    <div>
      <h2 className="error404h2">Oh no - it looks like there was an error</h2>
      <p className="error404p">{error.message}</p>
      <button className="error404a">Try again</button>
    </div>
  );
}
