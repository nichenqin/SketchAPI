import { assertEqual } from './assert'
import { Application } from '../Application'

export const ApplicationTests = {
  tests: {
    /** @test {Application#api_version} */
    testAPIVersion(context) {
      assertEqual(new Application(context).api_version, '1.1')
    },

    /** @test {Application#version} */
    testApplicationVersion(context) {
      if (
        !MSApplicationMetadata.metadata().app.startsWith(
          'com.bohemiancoding.sketch3'
        )
      ) {
        // When invoked by the Objective-C unit tests, we know that the bundle's version will be
        // set to 1.0 so it's ok to test it.
        assertEqual(new Application(context).version, '1.0')
      }
    },

    /** @test {Application#wrapObject} */
    testWrapObject(context) {
      const application = new Application(context)
      const classesToTest = [
        MSLayerGroup,
        MSPage,
        MSArtboardGroup,
        MSShapeGroup,
        MSBitmapLayer,
        MSTextLayer,
      ]
      const mappings = application.wrapperMappings()
      classesToTest.forEach(classToTest => {
        const frame = NSMakeRect(0, 0, 100, 100)
        const object = classToTest.alloc().initWithFrame(frame)
        const mockDocument = {}
        const wrapped = application.wrapObject(object, mockDocument)
        assertEqual(wrapped._object, object)
        assertEqual(wrapped.class, mappings[classToTest].class)
      })
    },
  },
}