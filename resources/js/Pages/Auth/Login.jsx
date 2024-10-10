import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Login() {
    const navigate = useNavigate();

    // フォームデータの状態管理
    const [data, setData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    // フォームのサブミット処理
    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            // CSRFトークンを取得
            await axios.get('/sanctum/csrf-cookie');

            // APIリクエストを送信してログイン
            // await axios.post("/api/login", data);
            await axios.post("/api/login", data, { withCredentials: true });

            // ログイン後にユーザー情報を取得
            const response = await axios.get('/api/user', { withCredentials: true });
            console.log(response.data);

            // ログイン成功後にダッシュボードやホームにリダイレクト
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // バリデーションエラーの処理
                setErrors(error.response.data.errors || {});
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <GuestLayout>
            <h1 className="text-xl font-bold">Log in</h1>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) =>
                            setData({
                                ...data,
                                email: e.target.value,
                            })
                        }
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData({ ...data, remember: e.target.checked })
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

                {errors.general && (
                    <div className="mt-4 text-red-600">{errors.general}</div>
                )}
            </form>
        </GuestLayout>
    );
}
