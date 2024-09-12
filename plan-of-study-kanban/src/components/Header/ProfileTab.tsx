import profile from "@/styles/profile.module.scss";

export default function ProfileTab() {
  return (
    <div className={profile.container}>
      <img className={profile.image} src="https://picsum.photos/200" alt="Profile Image" />
      <div className={profile.details}>
        <div className={profile.name}>Jessier Joram Adriel A Canal</div>
        <div className={profile.id}>2021-06005</div>
      </div>
    </div>
  );
}
