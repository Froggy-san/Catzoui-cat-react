// import { useEffect } from "react";

// function useHandleWishList(wished: boolean) {
//   useEffect(() => {
//     const handleWishList = () => {
//       if (wished) {
//         dispatch(deleteFromWishList(product.id));
//         toast("You have deleted an item from the wish list", {
//           description: (
//             <div className="flex items-center space-x-2">
//               <span>
//                 <HeartCrack size={15} />
//               </span>
//               <span>Item deleted</span>
//             </div>
//           ),
//           action: {
//             label: "Undo",
//             onClick: () => dispatch(addItemToWishList(product.id)),
//           },
//           closeButton: true,
//         });
//       } else {
//         dispatch(addItemToWishList(product.id));
//         toast("You have added an item to the wish list", {
//           description: (
//             <div className="flex items-center space-x-2">
//               <span>
//                 <PiHeartStraightFill size={15} />
//               </span>
//               <span>Item Added</span>
//             </div>
//           ),
//           action: {
//             label: "Undo",
//             onClick: () => dispatch(deleteFromWishList(product.id)),
//           },
//           closeButton: true,
//         });
//       }
//     };
//   }, [wished]);
// }
