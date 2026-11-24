import { staggerStyle } from "@/components/world/stagger";

export type DetailGroup = {
  title: string;
  items: readonly string[];
};

/** "Incluye / No incluye" lists on the maintenance card's back (the pack cards show the same groups as tabs, PackTabs). */
export function DetailGroups({ groups }: { groups: readonly DetailGroup[] }) {
  return (
    <div className="pack-groups">
      {groups.map((group) => (
        <section key={group.title} className="pack-group">
          <h4>{group.title}</h4>
          <ul className="pack-list">
            {group.items.map((item, index) => (
              <li key={item} style={staggerStyle(index)}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
