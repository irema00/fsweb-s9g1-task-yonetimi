import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";

export default function TaskHookForm({ kisiler, submitFn }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    people: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    ...formData,
    mode: "all",
  });
  const onSubmitHandler = (formData) => {
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
    console.log(formData);
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
        />
        <p className="input-error">
          {errors.title && <div>{errors.title.message}</div>}
        </p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        <p className="input-error">
          {errors.description && <div>{errors.description.message}</div>}
        </p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  required: "Lütfen en az bir kişi seçin",
                  validate: (val) => {
                    return val.length <= 3 || "En fazla 3 kişi seçebilirsiniz";
                  },
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">
          {" "}
          {errors.people && <div>{errors.people.message}</div>}
        </p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
