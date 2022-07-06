import React from 'react';

export const BaseHtmlLayout = () => {
  return <BodyContent />;
};

export const BodyContent = ({
  children,
  bodyHtml,
  bodyJs,
}: {
  children: React.ReactNode;
  bodyHtml: React.ReactNode;
  bodyJs: React.ReactNode;
}) => {
  return (
    <>
      {/* Page content that should be included in the <body> */}
      {bodyHtml}

      {/* Any JavaScript that should be included before </body> */}
      {bodyJs}
    </>
  );
};

export const BodyHtml = ({children}: {children: React.ReactNode}) => {
  return (
    <div
      id="page-container"
      className="bg-white-warm  font-sans  leading-normal"
    >
      {children}
    </div>
  );
};

export const BodyJs = ({children}: {children: React.ReactNode}) => {
  return <>{children}</>;
};
