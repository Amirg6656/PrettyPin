const Container = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;