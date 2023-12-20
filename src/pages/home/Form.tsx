import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import Radio from "@/components/ui/Radio/Radio";
import Preloader from "@/components/Preloader/Preloader";
import { getPositions } from "@/api/positions";
import { getToken } from "@/api/token";
import {
  PostUserRequest,
  PostUserResponse,
  UserResponse,
  postUser,
} from "@/api/users";
import { ApiError } from "@/api/ApiError";
import { emailRegex, normalizePhoneNumber, phoneRegex } from "@/utils/format";
import successImg from "@/assets/images/success-image.svg";
import cl from "./Form.module.scss";

type FormData = Omit<PostUserRequest, "photo"> & {
  photo: FileList;
};

type Props = React.HTMLAttributes<HTMLDivElement>;

const Form = (props: Props) => {
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    mode: "onTouched",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    let timer: number;
    if (showSuccess) timer = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  const {
    data: positions,
    isFetching: isPositionsFetching,
    isError: isPositionsError,
  } = useQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
  });

  const fetchToken = useMutation({
    mutationFn: getToken,
  });

  const createUser = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      reset();
      setShowSuccess(true);
      queryClient.setQueryData<InfiniteData<UserResponse, number>>(
        ["users"],
        (u) => {
          if (!u) return;
          return {
            pages: u.pages.slice(0, 1),
            pageParams: u.pageParams.slice(0, 1),
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: ApiError<PostUserResponse>) => {
      if (!(error instanceof ApiError) || error.details.success) return;

      createUser.reset();
      if (error.status === 409) {
        setError("phone", { type: "manual", message: error.message });
        setError("name", { type: "manual", message: error.message });
      }

      for (const [name, err] of Object.entries(error.details.fails ?? [])) {
        setError(name as keyof PostUserRequest, {
          type: "manual",
          message: err[0],
        });
      }
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const token = await fetchToken.mutateAsync();
      await createUser.mutateAsync({
        user: {
          ...data,
          photo: data.photo[0],
          phone: normalizePhoneNumber(data.phone),
        },
        token: token.token,
      });
    } catch {
      /* empty */
    }
  };

  if (isPositionsFetching || isSubmitting) {
    return (
      <section {...props}>
        <h2>Working with POST request</h2>
        <div className={cl.info}>
          <Preloader />
        </div>
      </section>
    );
  }

  if (isPositionsError || fetchToken.isError || createUser.isError) {
    return (
      <section {...props}>
        <h2>Working with POST request</h2>
        <div className={cl.info}>Error! Please, try again later...</div>
      </section>
    );
  }

  if (showSuccess) {
    return (
      <section {...props}>
        <h2>User successfully registered</h2>
        <img className={cl.successImg} src={successImg} alt="" />
      </section>
    );
  }

  return (
    <section {...props}>
      <h2>Working with POST request</h2>
      <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name", {
            required: "The name is required",
            minLength: {
              value: 2,
              message: "The name must be at least 2 characters.",
            },
            maxLength: {
              value: 60,
              message: "The name must be at less than 60 characters.",
            },
          })}
          autoComplete="username"
          errorMessage={errors.name?.message}
          label="Your name"
        />
        <Input
          {...register("email", {
            required: "The email is required",
            pattern: {
              value: emailRegex,
              message: "The email must be a valid email address.",
            },
          })}
          autoComplete="email"
          errorMessage={errors.email?.message}
          label="Email"
        />
        <Input
          {...register("phone", {
            required: "The phone field is required.",
            validate: (value) =>
              !!normalizePhoneNumber(value).match(phoneRegex) ||
              "+38 (XXX) XXX - XX - XX",
          })}
          type="tel"
          autoComplete="tel"
          details="+38 (XXX) XXX - XX - XX"
          errorMessage={errors.phone?.message}
          label="Phone"
        />
        <div className={cl.radioGroup}>
          <p>Select your position</p>
          {positions?.positions.map((p) => (
            <Radio
              key={p.id}
              label={p.name}
              value={p.id}
              {...register("position_id", { required: true })}
            />
          ))}
        </div>
        <Controller
          control={control}
          name="photo"
          rules={{
            validate: (value) => {
              if (!value || value.length === 0) return "The photo is required";
              if (value[0].type !== "image/jpeg" || value[0].size > 5e6)
                return "Image should be jpg/jpeg, at least 70x70px and less than 5MB";
              return true;
            },
          }}
          render={({ field }) => (
            <Input
              type="file"
              label="Upload your photo"
              errorMessage={errors.photo?.message}
              {...field}
              value={field.value?.[0]?.name}
              onChange={(e) => {
                field.onChange(e.target.files);
              }}
            />
          )}
        />
        <Button
          type="submit"
          disabled={!isValid || Object.keys(errors).length !== 0}
          className={cl.submit}
        >
          Sign up
        </Button>
      </form>
    </section>
  );
};

export default Form;
