import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Fewer Choices",
    Svg: require("@site/static/img/coolshapes_1.svg").default,
    description: (
      <>
        Tosui limits options to what's truly needed. Design tokens earn their
        place, reducing decision fatigue and improving consistency across your
        design system.
      </>
    ),
  },
  {
    title: "Composition Over Configuration",
    Svg: require("@site/static/img/coolshapes_2.svg").default,
    description: (
      <>
        Build complex interfaces from simple, powerful primitives. The system
        makes the right thing easy and the custom thing possible.
      </>
    ),
  },
  {
    title: "Effortless Themability",
    Svg: require("@site/static/img/coolshapes_3.svg").default,
    description: (
      <>
        Customize your design system by overriding a small set of CSS variables.
        Color tokens automatically adapt to light and dark modes.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className={clsx("text--center", styles.featureSvgContainer)}>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
