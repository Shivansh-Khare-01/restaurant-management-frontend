import TableController from "./table-controller";
import "./table.css";

export const Table = () => {
  const {
    handleSaveTable,
    handleDeleteTable,
    showPopup,
    tables,
    chairCount,
    setChairCount,
    setShowPopup,
    addButtonRef,
    popupRef,
    searchQuery,
    setSearchQuery,
    filteredTables,
    chairsCountArray,
  } = TableController();

  return (
    <div className="main-content-container">
      <div className="search-wrapper">
        <span className="search-icon"></span>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="main-content">
        <div className="table-container">
          <h1 className="title">Tables</h1>

            <div className="grid">
              {filteredTables?.length > 0 &&
                filteredTables?.map((table: any) => (
                  <div key={table?._id} className="table-card">
                    {table?.name && (
                      <>
                        <div className="table-name">Table</div>
                        <div className="table-number">{table?.name}</div>
                      </>
                    )}
                    <div className="table-chairs">
                      <svg
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.8125 2.73682V8.17844C4.76788 8.19025 4.71494 8.20732 4.67556 8.21913C4.46381 8.28432 4.31681 8.35257 4.21094 8.42432C4.16175 8.4561 4.11587 8.49274 4.074 8.53369C4.03988 8.56957 3.99219 8.64307 3.99219 8.64307L3.9375 8.73888V9.73682H4.375V13.2368H5.25V9.73682H8.75V13.2368H9.625V9.73682H10.0625V8.73888L10.0078 8.64307C10.0078 8.64307 9.95969 8.56957 9.92556 8.53369C9.88383 8.49277 9.8381 8.45612 9.78906 8.42432C9.68319 8.35257 9.53619 8.28432 9.324 8.21913C9.28463 8.20732 9.23212 8.19025 9.1875 8.17844V2.73682H8.3125V3.17432H5.6875V2.73682H4.8125ZM5.6875 4.04932H6.5625V8.00038C6.23088 8.00913 5.93338 8.01788 5.6875 8.0415V4.04932ZM7.4375 4.04932H8.3125V8.0415C8.06619 8.01744 7.76912 8.00913 7.4375 8.00038V4.04932Z"
                          fill="black"
                        />
                      </svg>
                      {table?.chairs}
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTable(table?._id)}
                    >
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.19667 17.0217 1.00067 16.5507 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.0217 17.805 13.5507 18.0007 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              <div
                className="add-table-card"
                onClick={() => setShowPopup(true)}
                ref={addButtonRef}
              >
                <span className="plus-sign">+</span>
              </div>
            </div>

          {showPopup && (
            <div className="popup-overlay" onClick={() => setShowPopup(false)}>
              <div
                className="popup"
                ref={popupRef}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="popup-title">Table name</h2>

                <div className="autoname">
                  {(tables?.length + 1).toString().padStart(2, "0")}
                </div>

                <div className="divider"></div>

                <div className="form-group">
                  <div className="chair-label">Chair</div>
                  <select
                    value={chairCount}
                    onChange={(e) => setChairCount(Number(e.target?.value))}
                  >
                    {chairsCountArray &&
                      chairsCountArray?.length > 0 &&
                      chairsCountArray?.map((num) => (
                        <option key={num} value={num}>
                          {num?.toString().padStart(2, "0")}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="popup-actions">
                  <button className="btn create" onClick={handleSaveTable}>
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
