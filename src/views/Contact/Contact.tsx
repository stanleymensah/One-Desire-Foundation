import ContactHero from "@/assets/contact.jpg";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";

type ContactFormValues = {
  firstName: string;
  surname: string;
  phone: string;
  email: string;
  businessName: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      surname: "",
      phone: "",
      email: "",
      businessName: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    console.log("Contact form submission:", values);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="contain flex flex-col gap-8 w-full">
          {/* Hero Section */}
          <section className="relative min-h-225 w-full overflow-hidden bg-transparent sm:min-h-170 lg:h-140">
            <img
              src={ContactHero}
              alt="Contact Us"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 block h-full w-full object-cover object-center bg-transparent"
            />
            <div className="details absolute inset-0 z-20 flex flex-col items-stretch justify-start gap-8 px-4 pb-8 pt-20 shadow-xl sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-24">
              <motion.div
                className="texts flex max-w-xl shrink-0 flex-col gap-4 sm:mx-auto lg:mx-0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-4xl font-medium sm:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Get in touch <br /> with Us
                </motion.h1>
                <motion.p
                  className="hidden sm:block"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  We would love to hear from you. Whether you have a question,
                  feedback, or want to explore working together, our team is
                  here to listen.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="form flex w-full max-w-xl shrink-0 flex-col gap-4 self-center rounded-sm bg-white p-4 shadow-lg sm:p-6 lg:w-md lg:self-auto"
              >
                <h5 className="text-start border-b pb-2">Fill the form</h5>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="flex w-full flex-col gap-5 sm:gap-6"
                >
                  <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-2">
                    <div className="relative flex min-w-0 flex-col gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <InputGroup>
                        <InputGroupInput
                          id="firstName"
                          placeholder="Your first name"
                          aria-invalid={!!errors.firstName}
                          {...register("firstName", {
                            required: "First name is required.",
                            minLength: {
                              value: 2,
                              message: "First name must be at least 2 characters.",
                            },
                            maxLength: {
                              value: 50,
                              message: "First name must be 50 characters or fewer.",
                            },
                            pattern: {
                              value: /^[\p{L}][\p{L}\s'-]*$/u,
                              message: "Enter a valid first name.",
                            },
                          })}
                        />
                      </InputGroup>
                      <p
                        className={`pointer-events-none absolute left-0 top-full z-30 w-max max-w-full bg-white text-xs ${
                          errors.firstName
                            ? "text-destructive"
                            : "invisible"
                        }`}
                      >
                        {errors.firstName?.message ?? "Error"}
                      </p>
                    </div>
                    <div className="relative flex min-w-0 flex-col gap-2">
                      <Label htmlFor="surname">Surname</Label>
                      <InputGroup>
                        <InputGroupInput
                          id="surname"
                          placeholder="Your surname"
                          aria-invalid={!!errors.surname}
                          {...register("surname", {
                            required: "Surname is required.",
                            minLength: {
                              value: 2,
                              message: "Surname must be at least 2 characters.",
                            },
                            maxLength: {
                              value: 50,
                              message: "Surname must be 50 characters or fewer.",
                            },
                            pattern: {
                              value: /^[\p{L}][\p{L}\s'-]*$/u,
                              message: "Enter a valid surname.",
                            },
                          })}
                        />
                      </InputGroup>
                      <p
                        className={`pointer-events-none absolute left-0 top-full z-30 w-max max-w-full bg-white text-xs ${
                          errors.surname ? "text-destructive" : "invisible"
                        }`}
                      >
                        {errors.surname?.message ?? "Error"}
                      </p>
                    </div>
                  </div>

                  <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-2">
                    <div className="relative flex min-w-0 flex-col gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <InputGroup>
                        <InputGroupInput
                          id="phone"
                          type="tel"
                          placeholder="Your phone number"
                          aria-invalid={!!errors.phone}
                          {...register("phone", {
                            required: "Phone number is required.",
                            pattern: {
                              value: /^\+?[0-9\s().-]{7,20}$/,
                              message: "Enter a valid phone number.",
                            },
                          })}
                        />
                      </InputGroup>
                      <p
                        className={`pointer-events-none absolute left-0 top-full z-30 w-max max-w-full bg-white text-xs ${
                          errors.phone ? "text-destructive" : "invisible"
                        }`}
                      >
                        {errors.phone?.message ?? "Error"}
                      </p>
                    </div>
                    <div className="relative flex min-w-0 flex-col gap-2">
                      <Label htmlFor="email">Email</Label>
                      <InputGroup>
                        <InputGroupInput
                          id="email"
                          type="email"
                          placeholder="Your email"
                          aria-invalid={!!errors.email}
                          {...register("email", {
                            required: "Email is required.",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Enter a valid email address.",
                            },
                          })}
                        />
                      </InputGroup>
                      <p
                        className={`pointer-events-none absolute left-0 top-full z-30 w-max max-w-full bg-white text-xs ${
                          errors.email ? "text-destructive" : "invisible"
                        }`}
                      >
                        {errors.email?.message ?? "Error"}
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full items-center">
                    <div className="relative flex flex-col w-full gap-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <InputGroup>
                        <InputGroupInput
                          id="businessName"
                          placeholder="Your business name"
                          aria-invalid={!!errors.businessName}
                          {...register("businessName", {
                            maxLength: {
                              value: 100,
                              message: "Business name must be 100 characters or fewer.",
                            },
                          })}
                        />
                      </InputGroup>
                      <p
                        className={`pointer-events-none absolute left-0 top-full z-30 w-max max-w-full bg-white text-xs ${
                          errors.businessName
                            ? "text-destructive"
                            : "invisible"
                        }`}
                      >
                        {errors.businessName?.message ?? "Error"}
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full items-center">
                    <div className="relative flex flex-col w-full gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Write a message"
                        rows={4}
                        className="resize-none field-sizing-fixed h-24 overflow-y-auto"
                        aria-invalid={!!errors.message}
                        {...register("message", {
                          required: "Message is required.",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters.",
                          },
                          maxLength: {
                            value: 1000,
                            message: "Message must be 1000 characters or fewer.",
                          },
                        })}
                      />
                      <p
                        className={`pointer-events-none absolute left-0 top-full z-30 w-max max-w-full bg-white text-xs ${
                          errors.message ? "text-destructive" : "invisible"
                        }`}
                      >
                        {errors.message?.message ?? "Error"}
                      </p>
                    </div>
                  </div>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </section>

          <section className="others w-full overflow-hidden flex flex-col gap-4">
              <SectionTitle label="other options" />
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:gap-48">
              <div className="email flex flex-col items-center">
                <SectionTitle label="Email us" />
                <Link to="" className="flex items-center gap-2 text-gray-600">
                  <Mail size={14} />
                  info@onedesirefoundation.com
                </Link>
              </div>

              <div className="email flex flex-col items-center">
                <SectionTitle label="Call us" />
                <Link to="" className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} />
                  +233 55 506 8 0718
                </Link>
              </div>

              {/* <div className="email flex items-center flex-col">
                <SectionTitle label="Call us" />
                <Link to="" className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} />
                  +233 55 506 8 0718
                </Link>
              </div> */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
