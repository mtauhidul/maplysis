import styles from './app.module.css';
import SideBar from './components/sidebar/SideBar';

function App() {
  return (
    <div className={styles.mainContainer}>
      <SideBar />
    </div>
  );
}

export default App;
