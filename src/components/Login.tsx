import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SoftBackdrop from "./SoftBackdrop";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type AuthState = "login" | "register";

type Props = {};

const Login = (_props: Props) => {
  const { t } = useTranslation();

  const [state, setState] = useState<AuthState>("login");
  const { user, login, signup } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    setSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      if (state === "login") {
        // si tu login no necesita name, igual no molesta; si molesta, pasá solo email/password
        await login({
          email: payload.email,
          password: payload.password,
        } as any);
      } else {
        await signup(payload as any);
      }
      // el redirect lo maneja el useEffect cuando user se setea
    } catch (err: any) {
      setError(err?.message || String(err) || "Auth error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const isLogin = state === "login";

  return (
    <>
      <SoftBackdrop />
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8"
        >
          <h1 className="text-white text-3xl mt-10 font-medium">
            {isLogin ? t("auth.login.title") : t("auth.signup.title")}
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            {isLogin ? t("auth.login.subtitle") : t("auth.signup.subtitle")}
          </p>

          {!isLogin && (
            <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-pink-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-white/60"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>

              <input
                type="text"
                name="name"
                placeholder={t("auth.fields.namePlaceholder")}
                className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none "
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-pink-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-white/75"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>

            <input
              type="email"
              name="email"
              placeholder={t("auth.fields.emailPlaceholder")}
              className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none "
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className=" flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-pink-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-white/75"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>

            <input
              type="password"
              name="password"
              placeholder={t("auth.fields.passwordPlaceholder")}
              className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4 text-left">
            <button
              type="button"
              className="text-sm text-pink-400 hover:underline"
            >
              {t("auth.actions.forgotPassword")}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-300 text-left">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full h-11 rounded-full text-white bg-pink-600 hover:bg-pink-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting
              ? "..."
              : isLogin
                ? t("auth.actions.login")
                : t("auth.actions.signup")}
          </button>

          <p
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
          >
            {isLogin
              ? t("auth.toggle.noAccount")
              : t("auth.toggle.haveAccount")}
            <span className="text-pink-400 hover:underline ml-1">
              {t("auth.toggle.clickHere")}
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
