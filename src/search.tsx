import { useState } from "react";
import { Action, ActionPanel, List } from "@raycast/api";
import { LaravelTip } from "./laravel-tip";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [showingDetail, setShowingDetail] = useState(false);
  const { data, isLoading } = new LaravelTip().search(searchText);

  return (
    <List
      filtering={false}
      navigationTitle={`found ${data.length} tips`}
      searchBarPlaceholder="Search your favorite tips"
      isLoading={isLoading}
      isShowingDetail={showingDetail}
      onSearchTextChange={setSearchText}
    >
      {data.map((tip) => {
        const props: Partial<List.Item.Props> = showingDetail
          ? {
              detail: <List.Item.Detail markdown={`## ${tip.title}\n\n${tip.content}`} />,
            }
          : {};

        return (
          <List.Item
            key={tip.id}
            title={tip.title}
            subtitle={`#${tip.title}`}
            {...props}
            actions={
              <ActionPanel>
                <Action title="Toggle Detail" onAction={() => setShowingDetail(!showingDetail)} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
