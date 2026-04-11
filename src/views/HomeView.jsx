import PageHeading from '../components/PageHeading/PageHeading';
import styles from './HomeView.module.css';

export default function HomeView() {
  return (
    <div className={styles.homeContainer}>
      <PageHeading text="Welcome" />

      <div className={styles.content}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex vel velit
          nihil illo est! Quos cum rerum dolores voluptates odio iste est nam
          excepturi placeat eligendi voluptatibus a illo eos ipsam, necessitatibus
          quo at quae pariatur et asperiores odit!
        </p>
      </div>
    </div>
  );
}
