'use client'

import { forwardRef, Suspense, useEffect, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'
import { useThree } from '@react-three/fiber'

export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight intensity={0.5} />
    <pointLight position={[20, 30, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} color='blue' />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
)

const View = forwardRef(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)
  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <AccessCanvas localRef={localRef} children={children} orbit={orbit} />
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }

const AccessCanvas = ({ localRef, children, orbit }) => {
  const { gl, scene, camera } = useThree()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      gl.render(scene, camera)
      const screenshot = gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      localRef.current.screenshot = screenshot
      console.log('localRef.current.screenshot', screenshot)
    }, 2000) // 1000 milliseconds = 1 second

    // Clean up the timeout when the component unmounts or when the dependency values change
    return () => clearTimeout(timeoutId)
  }, [gl, localRef])

  return (
    <ViewImpl track={localRef}>
      {children}
      {orbit && <OrbitControls />}
    </ViewImpl>
  )
}
