import EditService from "@/components/dashboard/service/editSlider";
import apiUrl from "@/lib/apiUrl";

export default async function ServiceEdit({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const res = await fetch(apiUrl('/service'), {
    method: "PUT",
    body: JSON.stringify({ id })
  });

  const json = await res.json();

  if (json.error) {
    return (
      <div>No data found</div>
    )
  }

  return (
    <div>
      <EditService slider={json.data} />
    </div>
  )
}
