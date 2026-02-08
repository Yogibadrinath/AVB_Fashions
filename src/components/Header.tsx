import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { ErrorAlert, SuccessAlert } from "./NotificationAlert";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Header = () => {
    const { login, isAuthenticated } = useAuth();
    const [inputPw, setInputPw] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(inputPw)) {
            setShowModal(false);
            setInputPw("");
            setShowPassword(false);
            SuccessAlert("Logged in as Admin!!!");
        } else {
            ErrorAlert("Invalid Admin Password!!!");
        }
    };

    return (
        <>
            <header 
                className="navbar navbar-dark bg-dark px-3 px-md-4 sticky-top border-bottom border-secondary d-flex align-items-center" 
                style={{ height: '64px', zIndex: 1020 }}
            >
                {/* 1. Left Section: Spacer to balance the header */}
                <div style={{ width: '40px' }} className="d-flex d-lg-none">
                    {/* You can put your Sidebar Toggle here later */}
                </div>

                {/* 2. Center Section: Absolute centering logic */}
                <div className="flex-grow-1 d-flex justify-content-center">
                    <span className="navbar-brand m-0 h1 fw-bold text-light text-uppercase tracking-wider">
                        AVB FASHIONS
                    </span>
                </div>
                
                {/* 3. Right Section: Admin Button */}
                <div style={{ width: '40px' }} className="d-flex justify-content-end">
                    {!isAuthenticated ? (
                        <button 
                            className="btn btn-outline-light border-0 admin-login-btn p-0" 
                            onClick={() => setShowModal(true)}
                            title="Admin Login"
                        >
                            <span style={{ fontSize: '1.2rem' }}>👤</span>
                        </button>
                    ) : (
                        <div style={{ width: '40px' }}></div> // Spacer when logged in
                    )}
                </div>
            </header>

            {/* Modal Logic */}
            {showModal && (
                <div className="modal show d-block p-2" style={{ background: 'rgba(0,0,0,0.85)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark text-white border-secondary shadow-lg">
                            <form onSubmit={handleVerify}>
                                <div className="modal-header border-secondary py-2 py-md-3">
                                    <h5 className="modal-title fs-6 fs-md-5">Admin Access</h5>
                                    <button 
                                        type="button" 
                                        className="btn-close btn-close-white" 
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body py-4">
                                    <label className="form-label small">Enter Password</label>
                                    <div className="position-relative">
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            className="form-control bg-dark text-white border-secondary pe-5 py-2" 
                                            placeholder="••••••••" 
                                            value={inputPw}
                                            onChange={(e) => setInputPw(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn text-secondary position-absolute end-0 top-50 translate-middle-y border-0 h-100"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ width: '45px' }}
                                        >
                                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-footer border-secondary">
                                    <button 
                                        type="button" 
                                        className="btn btn-sm btn-secondary" 
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-sm btn-primary px-4">
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;