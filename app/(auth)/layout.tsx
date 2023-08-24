const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full justify-center items-center h-full">
      {children}
    </div>
  );
};

export default AuthLayout;
