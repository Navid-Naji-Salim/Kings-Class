import { BellRing, Palette, Shield } from "lucide-react";
import { settingsSections } from "../data/adminPrototype";

const settingIcons = [Palette, BellRing, Shield];

export function SettingsPage() {
  return (
    <section className="prototype-page">
      <div className="prototype-hero">
        <div>
          <h2>Prepare school-wide preferences before rollout.</h2>
          <p>Settings are presented as reviewable modules so administrators can understand what would be configurable later.</p>
        </div>
      </div>

      <div className="settings-grid">
        {settingsSections.map((section, index) => {
          const Icon = settingIcons[index];
          return (
            <article key={section.title} className="settings-card">
              <div className="prototype-row__icon">
                <Icon size={19} />
              </div>
              <div>
                <h3>{section.title}</h3>
                <p>{section.detail}</p>
              </div>
              <span>{section.state}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
