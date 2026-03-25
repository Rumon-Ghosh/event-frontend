import EventDetails from "@/components/home/EventDetails";

type ParamsProps = {
  params: Promise<{ id: string }>;
};

const EventDetailsById = async ({ params }: ParamsProps) => {
  const { id } = await params;
  if (!id) {
    return <div>Event ID is required</div>;
  }
  return (
    <div>
      <EventDetails id={id} />
    </div>
  );
};

export default EventDetailsById;
