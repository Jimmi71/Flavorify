const Contact = () => {
  return (
    <>
      <h1 className="bg-black/80 text-blue-200 py-5 text-center md:text-4xl text-3xl font-extrabold lg:mt-8">
        Contact Us
      </h1>
      <div className="md:m-16 m-8">
        <h2 className=" text-red-500 text-center md:text-4xl text-3xl font-extrabold">
          Get in Touch with Flavorify - Let's Talk Food!
        </h2>
        <p className="mt-5 text-justify">
          Welcome to Flavorify - your ultimate destination for culinary delights
          and gastronomic experiences. We're thrilled that you're eager to
          connect with us. Whether you have a question, a suggestion, or just
          want to share your love for food, we're here to listen. Feel free to
          reach out through any of the channels below, and let's embark on a
          delicious journey together!
        </p>
        <h3 className=" text-red-500 font-bold text-2xl my-2">
          Contact Information:
        </h3>
        <p>
          <span className="font-bold">Address:</span> <br /> Flavorify <br />
          Clafornia, US, 123 <br /> <span className="font-bold">Phone:</span>
          <br /> 123456789 <br /> <span className="font-bold">Email:</span>{" "}
          <br /> info@flavorify.com
        </p>
      </div>
    </>
  );
};

export default Contact;
