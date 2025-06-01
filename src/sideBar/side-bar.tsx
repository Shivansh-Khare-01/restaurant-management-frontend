import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 6C10.7167 6 10.4793 5.904 10.288 5.712C10.0967 5.52 10.0007 5.28267 10 5V1C10 0.716667 10.096 0.479333 10.288 0.288C10.48 0.0966668 10.7173 0.000666667 11 0H17C17.2833 0 17.521 0.0960001 17.713 0.288C17.905 0.48 18.0007 0.717333 18 1V5C18 5.28333 17.904 5.521 17.712 5.713C17.52 5.905 17.2827 6.00067 17 6H11ZM1 10C0.716667 10 0.479333 9.904 0.288 9.712C0.0966668 9.52 0.000666667 9.28267 0 9V1C0 0.716667 0.0960001 0.479333 0.288 0.288C0.48 0.0966668 0.717333 0.000666667 1 0H7C7.28333 0 7.521 0.0960001 7.713 0.288C7.905 0.48 8.00067 0.717333 8 1V9C8 9.28333 7.904 9.521 7.712 9.713C7.52 9.905 7.28267 10.0007 7 10H1ZM11 18C10.7167 18 10.4793 17.904 10.288 17.712C10.0967 17.52 10.0007 17.2827 10 17V9C10 8.71667 10.096 8.47933 10.288 8.288C10.48 8.09667 10.7173 8.00067 11 8H17C17.2833 8 17.521 8.096 17.713 8.288C17.905 8.48 18.0007 8.71733 18 9V17C18 17.2833 17.904 17.521 17.712 17.713C17.52 17.905 17.2827 18.0007 17 18H11ZM1 18C0.716667 18 0.479333 17.904 0.288 17.712C0.0966668 17.52 0.000666667 17.2827 0 17V13C0 12.7167 0.0960001 12.4793 0.288 12.288C0.48 12.0967 0.717333 12.0007 1 12H7C7.28333 12 7.521 12.096 7.713 12.288C7.905 12.48 8.00067 12.7173 8 13V17C8 17.2833 7.904 17.521 7.712 17.713C7.52 17.905 7.28267 18.0007 7 18H1Z"
            fill="black"
          />
        </svg>
      ),
      label: "Analytics",
      path: "/",
    },
    {
      icon: (
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 15V18H5V15H15V18H18V12H2V15ZM17 7H20V10H17V7ZM0 7H3V10H0V7ZM15 10H5V2C5 1.46957 5.21071 0.960859 5.58579 0.585786C5.96086 0.210714 6.46957 0 7 0H13C13.5304 0 14.0391 0.210714 14.4142 0.585786C14.7893 0.960859 15 1.46957 15 2V10Z"
            fill="black"
          />
        </svg>
      ),
      label: "Table",
      path: "/table",
    },
    {
      icon: (
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H2V20H0V0ZM16 0H3V20H16C17.103 20 18 19.103 18 18V2C18 0.897 17.103 0 16 0ZM15 10H6V8H15V10ZM15 6H6V4H15V6Z"
            fill="black"
          />
        </svg>
      ),
      label: "Order List",
      path: "/orderlist",
    },
    {
      icon: (
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20V6H4V20H0ZM7 20V0H11V20H7ZM14 20V12H18V20H14Z"
            fill="black"
          />
        </svg>
      ),
      path: "/menu",
    },
  ];

  return (
    <div className="sidebar-wrapper">
      <div className="circle" />
      <div className="sidebar">
        <nav>
          {menuItems?.map((item, idx) => {
            const active = location?.pathname === item?.path;
            return (
              <Link
                to={item?.path}
                key={idx}
                className={`menu-item${active ? " active" : ""}`}
              >
                {item?.icon}
              </Link>
            );
          })}
        </nav>
        <div className="bottom-circle" />
      </div>
    </div>
  );
};
