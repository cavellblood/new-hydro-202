export default {
  apiVersion: 'v2022-07-01',
  dataset:
    // @ts-ignore
    process.env.SANITY_DATASET ||
    import.meta.env.VITE_SANITY_STUDIO_API_DATASET,
  projectId: '0yukpfvl',
  useCdn: true,
};
