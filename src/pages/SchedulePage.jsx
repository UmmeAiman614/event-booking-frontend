import Schedule from "../components/common/Schedule";
import PageHeader from "../components/common/PageHeader";



const SchedulePage = () => {
  return (
    <div>
        <PageHeader
        title="Schedule"
        image="/assets/page-header.jpg"
        breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Schedule" },
        ]}
        />
      <Schedule />
    </div>
  );
}   

export default SchedulePage;