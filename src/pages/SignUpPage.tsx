import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  // State to handle login form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State to handle errors
  const [error, setError] = useState("");

  // Use navigate hook to redirect after login
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", formData);

      if (response.status === 201 || response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      setError("Signup failed");
      console.error(error);
    }
  };
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-10">
        <div className="mx-auto grid w-[370px] lg:w-[450px] gap-6 lg:border lg:border-neutral-300 lg:p-10 lg:rounded-lg lg:bg-white">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              Signup into <span className="">Knowledge Nest</span>
            </h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Log in
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] h-screen">
        <img
          src="/home.png"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
