import { Detail } from "@raycast/api";
import { LaravelTip } from "./laravel-tip";

export default function Random() {
  const laravel = new LaravelTip();
  const { data, isLoading, error } = laravel.random();

  if (error) {
    let msg = "";
    if (error.message.includes("Query returned no rows")) {
      msg = "Could not find any tips, please run `laraveltips sync` command in your terminal to sync all tips first.";
    }

    return <Detail isLoading={false} markdown={`## Error \n ${msg} \n > ${error.message}`} />;
  }

  if (!data) {
    return <Detail isLoading={true} markdown={`## Loading \n Loading random tip...`} />;
  }

  return <Detail isLoading={isLoading} markdown={`## ${data.title} \n ${data.content}`} navigationTitle={data.title} />;
}
