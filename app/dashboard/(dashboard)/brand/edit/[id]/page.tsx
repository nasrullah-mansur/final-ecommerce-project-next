import EditBrand from "@/components/dashboard/brand/editBrand";
import apiUrl from "@/lib/apiUrl";

export default async function ServiceEdit({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const res = await fetch(apiUrl('/brand'), {
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
      <EditBrand slider={json.data} />
    </div>
  )
}
