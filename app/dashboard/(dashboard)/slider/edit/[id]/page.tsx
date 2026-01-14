import EditSlider from "@/components/dashboard/slider/editSlider";
import apiUrl from "@/lib/apiUrl";

export default async function SliderEdit({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const res = await fetch(apiUrl('/slider'), {
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
      <EditSlider slider={json.data} />
    </div>
  )
}
