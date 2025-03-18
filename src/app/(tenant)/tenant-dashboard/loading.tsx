import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="w-[90%] flex justify-center min-h-screen items-center text-blue-500 mx-auto">
      <Image
        src={'/loading.png'}
        width={500}
        height={500}
        alt="loading"
        className="w-96 mx-auto"
      />
    </div>
  );
};

export default LoadingPage;
