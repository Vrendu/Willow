class Api::BookingsController < ApplicationController
    def create
        @booking = Booking.new(booking_params)
        if @booking.save
        render :show
        else
        render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def destroy
        @booking = Booking.find(params[:id])
        @booking.destroy
        render json: params[:id]
    end

    def index 
        @bookings = Booking.all
        render :index
    end
    
    private
    
    def booking_params
        params.require(:booking).permit(:user_id, :listing_id, :date, :time, :participants)
    end
end