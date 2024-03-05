// import { useOutsideClick } from "@/hooks/useOutsideClick";
// import React, {
//   cloneElement,
//   createContext,
//   useContext,
//   useState,
// } from "react";

// interface MoreContextValue {
//   handleOpen: (e?: MouseEvent) => void;
//   isAccountOpen: boolean;
//   close: () => void;
// }

// const MoreContext = createContext<MoreContextValue>({
//   handleOpen: () => {},
//   isAccountOpen: false,
//   close: () => {},
// });

// const More = ({ children }: { children: React.ReactNode }) => {
//   const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

//   const close = () => setIsAccountOpen(false);

//   const handleOpen = (e?: MouseEvent) => {
//     e?.stopPropagation();

//     // Just toggle the state, don't call close
//     setIsAccountOpen((is) => !is);
//   };

//   return (
//     <MoreContext.Provider value={{ handleOpen, isAccountOpen, close }}>
//       {children}
//     </MoreContext.Provider>
//   );
// };

// function MenuButton({ children }: { children: React.ReactNode }) {
//   const { handleOpen } = useContext(MoreContext);
//   // Use React.Children.only to get the only child in the children prop
//   const onlyChild = React.Children.only(children) as React.ReactElement<any>;
//   return cloneElement(onlyChild, {
//     onClick: handleOpen,
//   });

//   //   const { handleOpen } = useContext(MoreContext);
//   //   return cloneElement(children, { onClick: handleOpen });
// }

// function AccountPopup() {
//   const { isAccountOpen, close } = useContext(MoreContext);

//   const ref = useOutsideClick(close, false);

//   if (isAccountOpen) {
//     return (
//       <div
//         ref={ref}
//         className="absolute p-3 bg-slate-200   rounded-md top-10   w-60 right-3"
//       >
//         Account
//       </div>
//     );
//   } else {
//     return null;
//   }
// }

// More.Button = MenuButton;
// More.AccountPopup = AccountPopup;

// export default More;
