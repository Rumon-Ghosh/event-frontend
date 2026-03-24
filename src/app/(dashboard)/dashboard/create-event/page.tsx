"use client";
import EventForm from "@/components/form/EventForm";
import React from "react";

const CreateEvent = () => {
  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <EventForm />
      </div>
    </div>
  );
};

export default CreateEvent;