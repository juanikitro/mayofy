export type DetailGroup = {
  title: string;
  items: readonly string[];
};

/** Shared "Incluye / No incluye" lists used by packs and maintenance. */
export function DetailGroups({ groups }: { groups: readonly DetailGroup[] }) {
  return (
    <div className="pack-groups">
      {groups.map((group) => (
        <section key={group.title} className="pack-group">
          <h4>{group.title}</h4>
          <ul className="pack-list">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
