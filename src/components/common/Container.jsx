const Container = ({ children }) => {
  return (
    <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;