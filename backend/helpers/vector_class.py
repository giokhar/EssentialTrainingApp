import math
import numpy as np
import matplotlib.pyplot as plt

class Vector():

    def __init__(self,components=[]):
        self.comps = np.array(components)
        self.dimension = len(self.comps)

    def __repr__(self):
        units = ['i','j','k','l']
        if self.dimension < 4:
            string = "+".join([str(comp)+unit for (comp,unit) in zip(self.comps,units)])
            return string
        else :
            raise ValueError('String representation is not currently supported for vectors of dimensionality greater than 4')

    def __eq__(self,vector):
        if self.comps.all() == vector.comps.all():
            return True
        else:
            return False

    def __abs__(self):
        #returns the magnitude of the vector
        return math.sqrt(sum(self.comps))

    def __add__(self,vector):
        new_comps = [x+y for (x,y) in zip(self.comps,vector.comps)]
        vec = Vector(new_comps)
        return vec

    def __sub__(self,vector):
        new_comps = [x-y for (x,y) in zip(self.comps,vector.comps)]
        vec = Vector(new_comps)
        return vec

    def get_list(self):

        return self.comps

    def r_theta(self):
        comps = self.comps
        if self.dimension == 2:
            r = abs(self)
            theta = math.atan( (comps[0]/comps[1])  )
            return (r,theta)
        else :
            raise TypeError('The vector must be two dimensional')

    def sum(self,vector):
        new_comps = [x+y for (x,y) in zip(self.comps,vector.comps)]
        vec = Vector(new_comps)
        return vec

    def dot(self,vector):
        if self.dimension == vector.dimension :
            return np.dot(self.comps,vector.comps)
        else :
            raise ValueError('Both vectors must have the same dimensionality')

    def cross(self,vector):
        if (self.dimension >3) or (vector.dimension > 3) :
            raise ValueError('The maximum supported dimensionality for cross is currently 3')
        else :
            #numpy behaves a bit weirdly when crossing two vectors of length 2, returning something that looks like a scalar
            if (self.dimension == 2) and (vector.dimension == 2):
                k_direction = int(np.cross(self.comps,vector.comps) )
                return np.array([0,0,k_direction])
            else:
                return np.cross(self.comps,vector.comps)

    def plot(self):
        if self.dimension == 2:
            comps = self.comps
            plt.figure()
            ax = plt.gca()
            plot = plt.arrow(0,0,comps[0],comps[1],head_width = 0.2,fc='k',ec='k')
            ax.set_xlim([-10, 10])
            ax.set_ylim([-10, 10])
            return ax
        else :
            raise ValueError('plotting is currently only supported for 2D vectors')
