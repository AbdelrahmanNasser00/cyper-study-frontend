function JoinUs() {
  return <div className="min-h-dvh container flex justify-between">
    
    
    <div className="first-half w-1/2">
        <form action="" className=" flex flex-col max-w-md px-10 py-12 mt-10 gap-5 rounded-4xl shadow-2xl ;
]">
          <input type="text" name="fullName" placeholder="Full Name" className="rounded-2xl border p-3 px-5 bg-gray-100 focus:border-blue-400"/>
          <input type="email" name="email" placeholder="Email" className="rounded-2xl border p-3 px-5 bg-gray-100 focus:border-blue-400"/>
          <textarea name="subject" id="subject"  placeholder="Subject" className="resize-none rounded-2xl border p-3 px-5 bg-gray-100 h-70 focus:border-blue-400">
          </textarea>
        </form>
    </div>
    
    <div className="second-half w-120 text-center flex flex-col justify-center  gap-5">
            <h3 className=" font-bold text-3xl">Join Our Expert Instructor Community</h3>
            <div className="px-15 ">
                <p className="text-2xl">Share your passion and expertise by teaching with us. Fill out the form below and start inspiring learners worldwide today!</p>
            </div>
            
    </div>
    
    </div>;
}

export default JoinUs;
