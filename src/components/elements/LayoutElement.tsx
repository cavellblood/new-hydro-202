export const LayoutElement = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <div className="layout-element">
        <>{children}</>
      </div>
    </>
  );
};
