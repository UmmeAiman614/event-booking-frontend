import Speakers from "../components/common/Speakers";
import PageHeader from "../components/common/PageHeader";

const SpeakersPage = () => {
  return (
    <div>
<PageHeader
        title="Speakers"
        image="/assets/page-header.jpg"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Speakers" },
        ]}
      />
      <Speakers bgColor="bg-cream" />
    </div>
  );
}

export default SpeakersPage;