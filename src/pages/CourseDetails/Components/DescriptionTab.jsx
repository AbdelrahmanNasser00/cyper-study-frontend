function DescriptionTab() {
  return (
    <>
      {" "}
      <div>
        <h4 className="text-2xl font-bold my-6">About This Course</h4>
        <p>
          This comprehensive course is designed to take you from beginner to
          professional web developer. You'll learn all the tools and
          technologies needed to build full-stack web applications.
        </p>
      </div>
      <div>
        <h4 className="text-2xl font-bold my-6">What you'll learn</h4>
        <ul className="list-disc ml-10">
          <li>Build responsive, accessible, and beautiful web applications</li>
          <li>Master modern JavaScript frameworks like React</li>
          <li>Create backend APIs with Node.js and Express</li>
          <li>Implement authentication and authorization</li>
        </ul>
      </div>
      <div>
        <h4 className="text-2xl font-bold my-6">Requirements</h4>
        <ul className="list-disc ml-10">
          <li>A computer (Windows, Mac, or Linux)</li>
          <li>No programming experience needed - beginner friendly!</li>
          <li>All tools and software used in this course are free</li>
          <li>A stable internet connection for video streaming</li>
        </ul>
      </div>
    </>
  );
}

export default DescriptionTab;
