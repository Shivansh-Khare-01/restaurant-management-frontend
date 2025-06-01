import "./cart-page.css";
import { cartController } from "./cart-controller";

const CartPage = () => {
  const {
    handleSwipeStart,
    handleSaveCookingInstructions,
    handleDeleteItem,
    handleQuantityUpdate,
    handleBackToMenu,
    handleSave,
    handleChange,
    showModal,
    setDeliveryOption,
    cookingInstructionsText,
    setCookingInstructionsText,
    cookingInstructionsModal,
    searchQuery,
    setSearchQuery,
    cartItems,
    setCookingInstructionsModal,
    deliveryOption,
    itemTotal,
    deliveryCharge,
    taxes,
    grandTotal,
    setShowModal,
    userDetails,
    formData,
    swipeIconRef,
    swipeButtonRef,
    totalPreparationTime,
    swipeProgressRef,
    swipeTrackRef,
    instructions,
    navigate,
  } = cartController();
  return (
    <>
      {cartItems && !!cartItems?.length ? (
        <div className="cart-container">
          <div className="cart-header flex ">
            <div>
              <h1>Good evening</h1>
              <p>Place your order here</p>
            </div>
            <div className="mt-4">
              <button
                className=""
                onClick={() => {
                  navigate("/menu");
                }}
              >
                Go To menu{" "}
              </button>
            </div>
          </div>
          <div className="cart-search-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target?.value)}
            />
          </div>
          {cartItems?.length > 0 &&
            cartItems?.map((item: any) => (
              <div key={item?._id} className="cart-item">
                <img src={item?.img} alt={item?.name} />
                <div className="cart-item-details">
                  <h3>{item?.name}</h3>
                  <p>₹ {item?.price}</p>
                  <div className="cart-item-size">{item?.description}</div>
                  <div className="cart-quantity-controls">
                    <button
                      onClick={() => handleQuantityUpdate(item?._id, "dec")}
                    >
                      -
                    </button>
                    <span>{item?.quantity}</span>
                    <button
                      onClick={() => handleQuantityUpdate(item?._id, "inc")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-remove-btn"
                  onClick={() => handleDeleteItem(item?._id)}
                >
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="13.5" cy="13.5" r="13.5" fill="#E04444" />
                    <path
                      d="M18 9L9 18"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 9L18 18"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          <div
            className="cooking-instructions"
            onClick={() => setCookingInstructionsModal(true)}
          >
            {instructions ? (
              <span>Edit cooking instructions</span>
            ) : (
              <span>Add cooking instructions (optional)</span>
            )}
          </div>
          <div className="order-type">
            <button
              className={deliveryOption === "DINE_IN" ? "active" : ""}
              onClick={() => setDeliveryOption("DINE_IN")}
            >
              Dine In
            </button>
            <button
              className={deliveryOption === "TAKE_AWAY" ? "active" : ""}
              onClick={() => setDeliveryOption("TAKE_AWAY")}
            >
              Take Away
            </button>
          </div>
          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Item Total</span>
              <span>₹{itemTotal?.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Delivery Charge</span>
              <span>₹{deliveryCharge?.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Taxes</span>
              <span>₹{taxes?.toFixed(2)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Grand Total</span>
              <span>₹{grandTotal?.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="user-details-btn"
          >
            {Object.keys(userDetails)?.length === 0
              ? "Add Your details"
              : "Edit your details"}
          </button>{" "}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">Enter your details</h2>
                  <button
                    className="modal-close"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <input
                    name="name"
                    placeholder="Name"
                    value={formData?.name}
                    onChange={handleChange}
                    className="details-input"
                    required
                  />

                  <input
                    name="phone"
                    placeholder="Phone"
                    value={formData?.phone}
                    onChange={handleChange}
                    className="details-input"
                    required
                  />

                  {deliveryOption === "TAKE_AWAY" && (
                    <textarea
                      name="address"
                      placeholder="Address"
                      value={formData?.address}
                      onChange={handleChange}
                      className="details-textarea"
                      required
                    />
                  )}

                  <div className="modal-actions">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="modal-cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="modal-submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {Object.keys(userDetails)?.length > 0 && (
            <div className="customer-details">
              <h3>Your details</h3>
              <div className="customer-info">
                {userDetails?.name}, {userDetails?.phone}
              </div>
              {deliveryOption === "TAKE_AWAY" && (
                <div className="delivery-address">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Delivery at Home - {userDetails?.address}</span>
                </div>
              )}
              <div className="delivery-time">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6v6l4 2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Delivery in {totalPreparationTime} mins</span>
              </div>
            </div>
          )}
          <div className="swipe-button" ref={swipeButtonRef}>
            <div
              className="swipe-button-icon"
              ref={swipeIconRef}
              onMouseDown={handleSwipeStart}
              onTouchStart={handleSwipeStart}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="swipe-button-text">Swipe to Order</div>
            <div className="swipe-track" ref={swipeTrackRef}>
              <div className="swipe-progress" ref={swipeProgressRef}></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-header">
            <h1>Your cart is empty</h1>
            <p>Add items to your cart to place an order</p>
            <button className="cart-close-btn" onClick={handleBackToMenu}>
              ×
            </button>
          </div>
          <div className="empty-cart-actions">
            <button className="back-to-menu-btn" onClick={handleBackToMenu}>
              Back to Menu
            </button>
          </div>
        </div>
      )}

      {cookingInstructionsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Add Cooking instructions</h2>
              <button
                className="modal-close"
                onClick={() => setCookingInstructionsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <textarea
                className="instructions-textarea"
                value={cookingInstructionsText}
                onChange={(e) => setCookingInstructionsText(e.target?.value)}
                placeholder="Type your cooking instructions here..."
              />
              <p className="instructions-note">
                The restaurant will try its best to follow your request.
                However, refunds or cancellations in this regard won't be
                possible.
              </p>
              <div className="modal-actions">
                <button
                  className="modal-cancel"
                  onClick={() => setCookingInstructionsModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="modal-submit"
                  onClick={() =>
                    handleSaveCookingInstructions(cookingInstructionsText)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { CartPage };
